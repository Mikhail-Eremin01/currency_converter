import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SortedCurrency } from '../../types/types';

interface IListProps {
    selectedCurrency: SortedCurrency | null;
	list: SortedCurrency[];
	handleSelect: (currency: SortedCurrency) => void;
}

const List: React.FC<IListProps> = ({ selectedCurrency, list, handleSelect }) => {
	return (
		<Box>
			<Menu>
				<MenuButton w={250} as={Button} rightIcon={<ChevronDownIcon />}>
					{selectedCurrency?.title ? selectedCurrency.title : "Выберите валюту"}
				</MenuButton>
				<MenuList maxH="250px" overflowY="auto">
					{list?.map((elem, index) => (
					<MenuItem key={index} onClick={() => handleSelect({code: elem?.code, rate: elem?.rate, title: elem?.title})}>
						{elem?.title} ({elem?.rate})
					</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Box>
	)
}

export default List;