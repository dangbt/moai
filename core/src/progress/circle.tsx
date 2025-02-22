import { IconSize } from "../icon/icon";
import s from "./circle.module.css";

export interface ProgressCircleColor {
	container: string;
	head: string;
	track: string;
}

interface Props {
	size: IconSize | 24 | 32;
	value: number | "indeterminate";
	color?: ProgressCircleColor;
}

const R = 45;
// prettier-ignore
const SPINNER_TRACK = `M 50,50 m 0,-${R} a ${R},${R} 0 1 1 0,${R * 2} a ${R},${R} 0 1 1 0,-${R * 2}`;
const PATH_LENGTH = 280;
const STROKE_WIDTH = 4;
const MIN_STROKE_WIDTH = 16;
const SIZE_LARGE = 100;

const getViewBox = (strokeWidth: number) => {
	const radius = R + strokeWidth / 2;
	const viewBoxX = (50 - radius).toFixed(2);
	const viewBoxWidth = (radius * 2).toFixed(2);
	return `${viewBoxX} ${viewBoxX} ${viewBoxWidth} ${viewBoxWidth}`;
};

// This follows blueprint's spinner. Please see the magic here:
// https://github.com/palantir/blueprint/blob/develop/packages/core/src/components/spinner/spinner.tsx
const getStroke = (props: Props) => {
	const width = Math.min(
		MIN_STROKE_WIDTH,
		(STROKE_WIDTH * SIZE_LARGE) / props.size
	);
	const value = props.value === "indeterminate" ? 0.25 : props.value;
	const offset = PATH_LENGTH - PATH_LENGTH * value;
	return { width, offset };
};

export const ProgressCircle = (props: Props): JSX.Element => {
	const stroke = getStroke(props);
	const color = props.color ?? ProgressCircle.colors.neutral;
	return (
		<span className={s.wrapper}>
			<svg
				className={[
					s.container,
					props.value === "indeterminate" ? s.animate : "",
					color.container,
				].join(" ")}
				width={props.size}
				height={props.size}
				strokeWidth={stroke.width}
				viewBox={getViewBox(stroke.width)}
			>
				<path
					className={[s.track, color.track].join(" ")}
					d={SPINNER_TRACK}
				/>
				<path
					className={[s.head, color.head].join(" ")}
					d={SPINNER_TRACK}
					pathLength={PATH_LENGTH}
					strokeDasharray={`${PATH_LENGTH} ${PATH_LENGTH}`}
					strokeDashoffset={stroke.offset}
				/>
			</svg>
		</span>
	);
};

const colorBase: Omit<ProgressCircleColor, "container"> = {
	head: s.head,
	track: s.track,
};

ProgressCircle.colors = {
	neutral: { ...colorBase, container: s.neutral } as ProgressCircleColor,
	highlight: { ...colorBase, container: s.highlight } as ProgressCircleColor,
	inverse: { ...colorBase, container: s.inverse } as ProgressCircleColor,
};
