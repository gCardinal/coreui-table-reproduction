import {CSmartPagination, CSmartTable} from '@coreui/react-pro';
import React, {FC, useMemo, useState} from 'react';
import type {CSmartTableProps} from '@coreui/react-pro/dist/components/smart-table/CSmartTableInterface';
import {Item} from '@coreui/react-pro/dist/components/smart-table/CSmartTableInterface';

export interface DataTableColumnProps {
    key: string;
    label: string;
    sortable?: boolean;
}

export interface DataTableProps {
    columns: DataTableColumnProps[] | string[];
    items: Record<string,
        string | number | { component: FC; props?: Record<string, any> }>[];
    itemsPerPage?: number;
}

export const DataTable: FC<DataTableProps> = ({
  columns,
  items,
  itemsPerPage: _itemsPerPage = 10,
}) => {
    const [activePage, setActivePage] = useState<number>(1);
    const itemsPerPage = useMemo(
        () => (_itemsPerPage < 1 ? 1 : _itemsPerPage),
        [_itemsPerPage],
    );
    const pages = useMemo(
        () => Math.ceil(items.length / itemsPerPage),
        [items, itemsPerPage],
    );
    const [rows, scopedColumns] = useMemo(() => {
        const rows: CSmartTableProps['items'] = [];
        const scopedColumns: CSmartTableProps['scopedColumns'] = {};

        items.forEach((item) => {
            const row: Item = {};

            for (const key of Object.keys(item)) {
                row[key] = item[key];

                if (typeof item[key] === 'object') {
                    scopedColumns[key] = (item) => {
                        const Component = item[key].component;

                        return (
                            <td>
                                <Component {...(item[key].props || {})} />
                            </td>
                        );
                    };
                }
            }

            rows.push(row);
        });

        return [rows, scopedColumns];
    }, [items]);

    return (
        <div className="sc-data-table">
            <CSmartTable
                activePage={activePage}
                itemsPerPage={itemsPerPage}
                columns={columns}
                items={rows}
                scopedColumns={scopedColumns}
            />
            <div className="sc-data-table-footer">
                <CSmartPagination
                    pages={pages}
                    activePage={activePage}
                    onActivePageChange={setActivePage}
                    doubleArrows={false}
                    nextButton="Next"
                    previousButton="Previous"
                    size="sm"
                />
            </div>
        </div>
    );
};
