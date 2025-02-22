import { DivPx, TextArea } from "..";

export const GalleryTextArea = (): JSX.Element => (
	<div>
		<TextArea defaultValue="Text area" rows={2} />
		<DivPx size={8} />
		<TextArea defaultValue="Text area" rows={2} disabled />
	</div>
);
