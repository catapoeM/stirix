const formatDateCustom = (
    dateString: string,
    dateFormat: 'yyyyMMdd' | 'yyyy-MM-dd' | 'ddMMyyyy' = 'yyyyMMdd',
    timeFormat: 'hh:mm' | 'HH:mm' = 'hh:mm'
): { date: string; time: string } => {
    const date = new Date(dateString);

    const yyyy = date.getFullYear().toString();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');

    const HH24 = date.getHours().toString().padStart(2, '0');
    const HH12 = (date.getHours() % 12 || 12).toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');

    // Format date
    let dateStr = '';
    switch (dateFormat) {
        case 'yyyyMMdd':
            dateStr = `${yyyy}${MM}${dd}`;
            break;
        case 'yyyy-MM-dd':
            dateStr = `${yyyy}-${MM}-${dd}`;
            break;
        case 'ddMMyyyy':
            dateStr = `${dd}${MM}${yyyy}`;
            break;
        default:
            dateStr = `${yyyy}${MM}${dd}`;
    }

    // Format time
    const timeStr = timeFormat === 'HH:mm' ? `${HH24}:${mm}` : `${HH12}:${mm}`;

    return { date: dateStr, time: timeStr };
}

export {formatDateCustom}