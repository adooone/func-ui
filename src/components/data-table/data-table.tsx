import { type CSSProperties, type HTMLAttributes, type ReactNode, useMemo } from 'react';
import { cn } from '../../utils/style-helpers';
import { Skeleton } from '../skeleton';
import styles from './data-table.module.scss';

export type DataTableAlign = 'left' | 'center' | 'right';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  width?: number | string;
  align?: DataTableAlign;
}

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (row: T) => string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  loading?: boolean;
  loadingRows?: number;
  emptyMessage?: ReactNode;
  caption?: ReactNode;
  rowClassName?: string | ((row: T) => string);
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  striped = true,
  hoverable = true,
  compact = false,
  loading = false,
  loadingRows = 3,
  emptyMessage = 'No data',
  caption,
  rowClassName,
  onRowClick,
  className,
  ...props
}: DataTableProps<T>) {
  const alignClass = (align?: DataTableAlign) => (align ? styles[align] : undefined);
  const placeholders = useMemo(
    () => Array.from({ length: loadingRows }, (_, index) => `fui-data-table-loading-${index}`),
    [loadingRows],
  );

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <table className={cn(styles.table, compact && styles.compact)}>
        {caption != null && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.head}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(styles.th, alignClass(column.align))}
                style={{ width: column.width } as CSSProperties}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading &&
            placeholders.map((placeholder) => (
              <tr key={placeholder} className={styles.row}>
                {columns.map((column) => (
                  <td key={column.key} className={cn(styles.td, alignClass(column.align))}>
                    <Skeleton width="70%" />
                  </td>
                ))}
              </tr>
            ))}
          {!loading && data.length === 0 && (
            <tr className={styles.row}>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading &&
            data.map((row, index) => {
              const rowKey = keyExtractor(row);
              return (
                <tr
                  key={rowKey}
                  className={cn(
                    styles.row,
                    striped && index % 2 === 1 && styles.striped,
                    hoverable && styles.hoverable,
                    onRowClick && styles.clickable,
                    typeof rowClassName === 'function' ? rowClassName(row) : rowClassName,
                  )}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowKey}-${column.key}`}
                      className={cn(styles.td, alignClass(column.align))}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
