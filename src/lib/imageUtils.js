/**
 * Generates a deterministic image path based on a string or numeric ID.
 * This ensures the same news item always shows the same image across different pages.
 */
export const getNewsImage = (id) => {
    if (!id) return `/img2/halcones1.jpeg`;

    const idStr = String(id);
    let hash = 0;
    for (let i = 0; i < idStr.length; i++) {
        hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    const index = (Math.abs(hash) % 32) + 1;
    return `/img2/halcones${index}.jpeg`;
};
