import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginatedTable<T>({
  columns,
  data,
  page,
  totalPages,
  onPageChange,
}: Props<T>) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950/20 dark:ring-white/10">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full border-separate border-spacing-0 text-sm">
          <TableHeader className="border-b border-slate-200/70 bg-slate-50/80 dark:border-slate-800 dark:bg-white/[0.03]">
            <TableRow>
              {columns.map((col, i) => (
                <TableCell
                  key={i}
                  isHeader
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {data.map((row: T, index) => (
              <TableRow
                key={index}
                className="transition-colors hover:bg-slate-50/70 dark:hover:bg-white/[0.03]"
              >
                {columns.map((col, i) => (
                  <TableCell
                    key={i}
                    className="px-6 py-4 align-middle text-slate-900 dark:text-slate-100"
                  >
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 border-t border-slate-200/70 bg-slate-50/30 px-6 py-4 dark:border-slate-800 dark:bg-white/[0.02]">
        {/* Previous */}
        <Button
          size="sm"
          variant="outline"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          ← Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = page === i;

            return (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ring-1 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] dark:focus-visible:ring-offset-slate-950
                ${
                  isActive
                    ? "bg-brand-500 text-white ring-brand-500 shadow-sm shadow-brand-500/20"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:bg-transparent dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-white/[0.04] dark:hover:text-slate-100"
                }
                `}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
