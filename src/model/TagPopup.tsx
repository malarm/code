import { Chip, Popover } from '@material-ui/core';
import React from 'react';
import { TagPopupModelProps } from './modelTypes';

const MouseOverPopover = (props: TagPopupModelProps) => {
	const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			{
				props.tags.map((tag, index) => (
					index < (props.maxTags) ?
						<Chip key={`nonpopover${index}`} color="primary" size="small" label={tag.title} style={{ margin: 2, backgroundColor: tag.class }} /> :
						(index === props.maxTags && <span
							key={`nonpopover${index}`}
							aria-owns={open ? 'mouse-over-popover' : undefined}
							aria-haspopup="true"
							onMouseEnter={handlePopoverOpen}
							onMouseLeave={handlePopoverClose}>
							<Chip
								color="primary"
								size="small"
								label="..."
								style={{ margin: 2 }} />
						</span>)
				))
			}
			<Popover
				id="mouse-over-popover"
				open={open}
				style={{
					pointerEvents: 'none'
				}}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus>
				<div style={{ backgroundColor: 'rgb(250, 179, 174)' }}>
					{

						props.tags.map((tag, index) => (
							props.maxTags <= index && <span key={index}>
								<Chip key={`popover${index}`} color="primary" size="small" label={tag.title} style={{ margin: 2, backgroundColor: tag.class }} />
							</span>
						))
					}
				</div>
			</Popover>
		</div>
	);
}
export default MouseOverPopover;
