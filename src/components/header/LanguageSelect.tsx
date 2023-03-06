import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18nextInit";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Typography } from "@material-ui/core";

const languageMap: { [key: string]: { label: string, dir: "ltr" | "rtl", active: boolean }; } = {
	en: { label: "English", dir: "ltr", active: true },
	dk: { label: "Danish", dir: "ltr", active: false },
	se: { label: "Swedish", dir: "ltr", active: false }
};

const LanguageSelect = () => {
	const selected = localStorage.getItem("i18nextLng") || "en";
	const { t } = useTranslation();

	const [menuAnchor, setMenuAnchor] = useState<any>(null);

	useEffect(() => {
		document.body.dir = languageMap[selected].dir;
	}, [menuAnchor, selected]);

	return (
		<div className="d-flex justify-content-end align-items-center language-select-root">
			<Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}  color="primary">
				<Typography style={{ color: 'white' }} variant="subtitle2">{languageMap[selected].label}</Typography>
				<ArrowDropDown fontSize="small" style={{ color: 'white' }}/>
			</Button>
			<Popover
				open={!!menuAnchor}
				anchorEl={menuAnchor}
				onClose={() => setMenuAnchor(null)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right"
				}}
			>
				<div>
					<List>
						<ListSubheader>{t("select_language")}</ListSubheader>
						{Object.keys(languageMap)?.map(item => (
							<ListItem
								button
								key={item}
								onClick={() => {
									i18n.changeLanguage(item);
									setMenuAnchor(null);
								}}
							>
								{languageMap[item].label}
							</ListItem>
						))}
					</List>
				</div>
			</Popover>
		</div>
	);
};

export default LanguageSelect;
