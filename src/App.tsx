import { useEffect, useState } from 'react';
import './App.css';

import { Box, Spinner, Input } from '@chakra-ui/react';
import { SortedCurrency } from './types/types';
import React from 'react';
import { getCurrencies, onChangeFromValue, onChangeToValue } from './misc/common';

const List = React.lazy(() => import("./components/List/List"));
const Header = React.lazy(() => import("./components/Header/Header"));

const App = () => {
	const [isListOfCurrencies, setIsListOfCurrencies] = useState<SortedCurrency[]>([]);
	const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<{ code: string, rate: number, title: string } | null>({ code: "", rate: 0, title: "" });
	const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<{ code: string, rate: number, title: string } | null>({ code: "", rate: 0, title: "" });
	const [inputValueFrom, setInputValueFrom] = useState<string>("");
	const [inputValueTo, setInputValueTo] = useState<string>("");

	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		getCurrencies(setIsListOfCurrencies, setSelectedCurrencyFrom, setSelectedCurrencyTo, setIsError);
	}, []);

	useEffect(() => {
		onChangeFromValue(inputValueFrom, isListOfCurrencies, selectedCurrencyFrom, selectedCurrencyTo, setInputValueTo, setInputValueFrom)
	}, [selectedCurrencyFrom])

	useEffect(() => {
		onChangeFromValue(inputValueTo, isListOfCurrencies, selectedCurrencyFrom, selectedCurrencyTo, setInputValueTo, setInputValueFrom)
	}, [selectedCurrencyTo])

	if (isError) {
		return (
			<Box
				height={"100vh"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				Something went wrong!
			</Box>
		);
	}

	if (isListOfCurrencies.length === 0 && !isError) {
		return (
			<Box
				height={"100vh"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Spinner size='xl' color='red.500' />
			</Box>
		);
	}

	return (
		<>
			<Header />
			<div className="card">
				<Box display={"flex"} flexDirection={"row"} gap={20}>
					<Box display={"flex"} gap={5} flexDirection={"column"}>
					<List
						selectedCurrency={selectedCurrencyFrom}
						list={isListOfCurrencies}
						handleSelect={(value: SortedCurrency) => setSelectedCurrencyFrom({ code: value.code, rate: value.rate, title: value.title })}
					/>
					<Input
						type="number"
						value={inputValueFrom}
						onChange={(e) => onChangeFromValue(
							e.target.value,
							isListOfCurrencies,
							selectedCurrencyFrom,
							selectedCurrencyTo,
							setInputValueTo,
							setInputValueFrom
						)}
						placeholder="Введите сумму"
					/>
					</Box>

					<Box display={"flex"} gap={5} flexDirection={"column"}>
					<List
						selectedCurrency={selectedCurrencyTo}
						list={isListOfCurrencies}
						handleSelect={(value: SortedCurrency) => setSelectedCurrencyTo({ code: value.code, rate: value.rate, title: value.title })}
					/>
					<Input
						type="number"
						value={inputValueTo}
						onChange={(e) => onChangeToValue(
							e.target.value,
							isListOfCurrencies,
							selectedCurrencyFrom,
							selectedCurrencyTo,
							setInputValueTo,
							setInputValueFrom
						)}
						placeholder="Введите сумму"
					/>
					</Box>
				</Box>
			</div>
		</>
	);
};

export default App;