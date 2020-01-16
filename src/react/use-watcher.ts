import { useForceUpdate } from './use-force-update';

import { Watcher } from '../shared/subject';
import { useRef, useEffect } from 'react';

export default function useWatcher<T>(watcher: Watcher<T>) {
    const update = useForceUpdate();
    const state = useRef(watcher.data);

    function handleStatusChange(val: T) {
        state.current = val as any;
        update();
    }

    function setStatus(val: T) {
        watcher.data = val as any;
    }

    useEffect(() => {
        watcher.observe(handleStatusChange);
        return () => watcher.unObserve(handleStatusChange);
    }, []);

    return [state.current, setStatus] as const;
}
