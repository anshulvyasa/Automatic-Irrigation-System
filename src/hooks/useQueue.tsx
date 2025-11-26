import { useState } from "react";

export function useQueue(size = 12) {
    const [queue, setQueue] = useState(Array(size).fill(0));

    const add = (item) => {
        setQueue(prev => {
            const q = [...prev];
            q.shift();
            q.push(item);
            return q;
        });
    };

    return { queue, add };
}
