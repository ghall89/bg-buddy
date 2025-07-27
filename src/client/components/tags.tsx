import { Chip } from '@heroui/react';

interface TagsProps {
	tags: string[];
}

export function Tags({ tags }: TagsProps) {
	return (
		<div className="flex gap-2 justify-center p-4">
			{tags.map((tag) => (
				<Chip size="md" variant="faded" color="primary" key={tag}>
					{tag}
				</Chip>
			))}
		</div>
	);
}
