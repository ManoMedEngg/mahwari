import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDate } from '../lib/dateUtils';

export default function PeriodTable({ periods, t }) {
    if (!periods || periods.length === 0) {
        return (
            <div className="glass rounded-xl p-4 mt-4 text-center text-muted-text">
                No history recorded yet. Add a period in the calendar.
            </div>
        );
    }

    return (
        <div className="glass rounded-xl mt-4 table-container">
            <Table className="padded-table">
                <TableCaption style={{ marginBottom: '10px' }}>{t.period_history}</TableCaption>
                <TableHeader className="sticky-header">
                    <TableRow>
                        <TableHead className="w-[50px]">{t.s_no}</TableHead>
                        <TableHead>{t.days}</TableHead>
                        <TableHead>{t.start_date}</TableHead>
                        <TableHead className="text-right">{t.end_date}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {periods.map((p, idx) => (
                        <TableRow key={idx} className="spaced-row">
                            <TableCell className="font-medium">{idx + 1}</TableCell>
                            <TableCell>{p.days}d</TableCell>
                            <TableCell>{formatDate(p.start)}</TableCell>
                            <TableCell className="text-right">{formatDate(p.end)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <style jsx>{`
                .table-container {
                    max-height: 260px; /* Approx 5 rows */
                    overflow-y: auto;
                    position: relative;
                    margin: 20px 0; /* Margin as requested */
                }
                :global(.padded-table) {
                    border-collapse: separate; 
                    border-spacing: 0 8px; /* Space between rows */
                }
                :global(.spaced-row td) {
                    background: rgba(255,255,255,0.03); /* Slight contrast for rows */
                }
                :global(.spaced-row td:first-child) {
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
                :global(.spaced-row td:last-child) {
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }

                /* Custom Scrollbar */
                .table-container::-webkit-scrollbar {
                    width: 6px;
                }
                .table-container::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .table-container::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 3px;
                }
                .table-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }

                /* Sticky Header */
                :global(.sticky-header) {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                :global(.sticky-header th) {
                    background: #000000; /* Solid Black as requested "header below the calender that letter are in blackmake that in white" - wait, user said "letter in black make that in white". The HEADER TEXT is likely white by default in dark mode, but maybe I misinterpreted. Let's make text explicitly white and background dark. */
                    color: white; 
                    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
                }
            `}</style>
        </div>
    )
}
