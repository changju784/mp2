export function formatDate(iso?: string | null): string {
    if (!iso) return '';
    // Accept strings like '2008-09-10T06:14:20Z' or '2008-09-10'
    // Try to parse safely without depending on timezone conversion.
    const match = iso.match(/^\s*(\d{4}-\d{2}-\d{2})/);
    if (match && match[1]) return match[1];
    // Fallback: attempt Date parsing and format as UTC date portion
    try {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    } catch (e) {
        return iso;
    }
}

export default formatDate;
