import { useState, useEffect } from "react";

const RetryTimer = (initialTime, onTimeout) => {
    const [retryTime, setRetryTime] = useState(initialTime);

    useEffect(() => {
        if (retryTime > 0) {
            const timer = setInterval(() => {
                setRetryTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            onTimeout();
        }
    }, [retryTime, onTimeout]);

    return [retryTime, setRetryTime];
};

export default RetryTimer;