import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import type { StateSchedule } from "../lib/types";

const MONTH_ORDER = ["Apr", "May", "Jun", "Jul"];

function monthOf(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short" });
}

export default function DataViz({ states }: { states: StateSchedule[] }) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    states.forEach((s) => {
      const m = monthOf(s.selfEnumStart);
      counts[m] = (counts[m] || 0) + 1;
    });
    return MONTH_ORDER.map((m) => ({
      month: m,
      states: counts[m] || 0,
    }));
  }, [states]);

  if (states.length === 0) return null;

  const colors = ["#ff9933", "#ff9933", "#2563eb", "#138808"];

  return (
    <div className="dataviz">
      <div className="dataviz-chart">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3350" vertical={false} />
            <XAxis dataKey="month" stroke="#9aa3b8" fontSize={13} />
            <YAxis allowDecimals={false} stroke="#9aa3b8" fontSize={13} />
            <Tooltip
              contentStyle={{
                background: "#141a2b",
                border: "1px solid #2a3350",
                borderRadius: 8,
                color: "#e6e9f0",
              }}
              cursor={{ fill: "rgba(255,153,51,0.08)" }}
            />
            <Bar dataKey="states" radius={[8, 8, 0, 0]} name="States entering house-listing phase">
              {data.map((entry, i) => (
                <Cell key={entry.month} fill={colors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="dataviz-caption">
        States &amp; UTs beginning their self-enumeration window by month (sample schedule shown)
      </p>
    </div>
  );
}
