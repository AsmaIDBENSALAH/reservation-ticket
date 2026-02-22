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
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              {columns.map((col, i) => (
                <TableCell
                  key={i}
                  isHeader
                  className="px-6 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((row: T, index) => (
              <TableRow key={index}>
                {columns.map((col, i) => (
                  <TableCell
                    key={i}
                    className="px-6 py-4 text-gray-800 dark:text-white/90"
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
      <div className="flex items-center justify-between px-6 py-4">
        {/* Previous */}
        <Button
          size="sm"
          variant="outline"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          ← Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = page === i;

            return (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`h-9 w-9 rounded-lg text-sm font-medium border transition
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
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
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
