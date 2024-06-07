import React, { FC } from "react";
import { clamp } from "../utils/clamp";
import { QuestionFormsProps } from "../components/tabs/tabs";
import { ImageWrapperProps } from "../interfaces/interfaces";

enum Direction {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

interface ResizableProps{
    setValue: (value: ImageWrapperProps) => void
}

export const useResizable = ({setValue} : ResizableProps) => {
    const [node, setNode] = React.useState<HTMLElement | null>(null);

    const ref = React.useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);

    const handleMouseDown = React.useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (!node) {
            return;
        }
        const target = e.target as HTMLElement;
        const direction = target.classList.contains("resizer--r")
                            ? Direction.Horizontal
                            : Direction.Vertical;
        const startPos = {
            x: e.clientX,
            y: e.clientY,
        };
        const styles = window.getComputedStyle(node);
        const w = parseInt(styles.width, 10);
        const h = parseInt(styles.height, 10);

        const handleMouseMove = (e: MouseEvent) => {
           const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            const parent = node.parentElement as HTMLElement;
            const parentRect = parent.getBoundingClientRect();
            const eleRect = node.getBoundingClientRect();
            const newWidth = clamp(w + dx, 0, parentRect.width - (eleRect.left - parentRect.left));
            const newHeight = clamp(h + dy, 0, parentRect.height - (eleRect.top - parentRect.top));

            direction === Direction.Horizontal
                ? node.style.width = `${newWidth}px`
                : node.style.height = `${newHeight}`;
            setValue({ height: node.style.height, width: node.style.width });
            updateCursor(direction);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [node]);

    const handleTouchStart = React.useCallback((e: TouchEvent) => {
        e.stopPropagation();
        if (!node) {
            return;
        }

        const target = e.target as HTMLElement;
        const direction = target.classList.contains("resizer--r")
                            ? Direction.Horizontal
                            : Direction.Vertical;
        const touch = e.touches[0];
        const startPos = {
            x: touch.clientX,
            y: touch.clientY,
        };

        const styles = window.getComputedStyle(node);
        const w = parseInt(styles.width, 10);
        const h = parseInt(styles.height, 10);

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;

            const parent = node.parentElement as HTMLElement;
            const parentRect = parent.getBoundingClientRect();
            const eleRect = node.getBoundingClientRect();
            const newWidth = clamp(w + dx, 0, parentRect.width - (eleRect.left - parentRect.left));
            const newHeight = clamp(h + dy, 0, parentRect.height - (eleRect.top - parentRect.top));

            direction === Direction.Horizontal
                ? node.style.width = `${newWidth}px`
                : node.style.height = `${newHeight}`;
            setValue({ height: node.style.height, width: node.style.width });
            updateCursor(direction);
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor();
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [node]);

    const updateCursor = (direction: Direction) => {
        document.body.style.cursor = direction === Direction.Horizontal ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
    };

    const resetCursor = () => {
        document.body.style.removeProperty('cursor');
        document.body.style.removeProperty('user-select');
    };

    React.useEffect(() => {
        if (!node) {
            return;
        }
        const nodeList = node.querySelectorAll('.resizer');
        const elementsArray = Array.from(nodeList) as HTMLElement[];
        const resizerElements = [...elementsArray];

        resizerElements.forEach((resizerEle) => {
            resizerEle.addEventListener("mousedown", handleMouseDown);
            resizerEle.addEventListener("touchstart", handleTouchStart);
        });

        return () => {
            resizerElements.forEach((resizerEle) => {
                resizerEle.removeEventListener("mousedown", handleMouseDown);
                resizerEle.removeEventListener("touchstart", handleTouchStart);
            });
        };
    }, [node]);

    return [ref];
};