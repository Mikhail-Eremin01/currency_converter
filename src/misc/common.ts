import axios from "axios";
import { Currency, SortedCurrency } from "../types/types";

export const onChangeToValue = (
	value: string, 
	isListOfCurrencies: SortedCurrency[], 
	selectedCurrencyFrom: { code: string; rate: number; title: string } | null, 
	selectedCurrencyTo: { code: string; rate: number; title: string } | null, 
	setInputValueTo: (value: string) => void,
	setInputValueFrom: (value: string) => void
) => {
    let price: number;
    let result: number;
  
    const fromCurrency = isListOfCurrencies.find(elem => elem.code === selectedCurrencyFrom?.code);
    const toCurrency = isListOfCurrencies.find(elem => elem.code === selectedCurrencyTo?.code);

    if (selectedCurrencyTo?.code === 'UAH') {
		price = +value;
		result = price / (fromCurrency ? fromCurrency.rate : 1);
    } else if (selectedCurrencyFrom?.code === 'UAH') {
		price = +value;
		result = price * (toCurrency ? toCurrency.rate : 1);
    } else {
		price = +value / (toCurrency ? toCurrency.rate : 1);
		result = price * (fromCurrency ? fromCurrency.rate : 1);
    }
    setInputValueTo(value);
    setInputValueFrom(result.toString());
}

export const onChangeFromValue = (
	value: string, 
	isListOfCurrencies: SortedCurrency[], 
	selectedCurrencyFrom: { code: string; rate: number; title: string } | null, 
	selectedCurrencyTo: { code: string; rate: number; title: string } | null, 
	setInputValueTo: (value: string) => void,
	setInputValueFrom: (value: string) => void
) => {
    let price: number;
    let result: number;

    const fromCurrency = isListOfCurrencies.find(elem => elem.code === selectedCurrencyFrom?.code);
    const toCurrency = isListOfCurrencies.find(elem => elem.code === selectedCurrencyTo?.code);
  
    if (selectedCurrencyFrom?.code === 'UAH') {
		price = +value;
		result = price / (toCurrency ? toCurrency.rate : 1);
    } else if (selectedCurrencyTo?.code === 'UAH') {
		price = +value * (fromCurrency ? fromCurrency.rate : 1);
		result = price;
    } else {
		price = +value / (fromCurrency ? fromCurrency.rate : 1);
		result = price * (toCurrency ? toCurrency.rate : 1);
    }

    setInputValueFrom(value);
    setInputValueTo(result.toString());
}

export const getCurrencies = async (
	setIsListOfCurrencies: (currencies: SortedCurrency[]) => void, 
	setSelectedCurrencyFrom: (currency: { code: string; rate: number; title: string } | null) => void, 
	setSelectedCurrencyTo: (currency: { code: string; rate: number; title: string } | null) => void,
	setIsError: (error: boolean) => void
) => {
  try {
	const response = await axios.get<Currency[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
	const sortedData: SortedCurrency[] = [
			...response.data.map(elem => ({
			title: elem.txt,
			rate: elem.rate,
			code: elem.cc
		})),
		{ title: "Українська гривня", rate: 1, code: "UAH" }
    ].sort((a, b) => a.title.localeCompare(b.title));

		setIsListOfCurrencies(sortedData);
		setSelectedCurrencyFrom(sortedData.find(elem => elem.code === "UAH") || null);
		setSelectedCurrencyTo(sortedData.find(elem => elem.code === "USD") || null);
	} catch (error) {
		console.error("Ошибка при получении данных: ", error);
		setIsError(true);
	}
};