import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Flex, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const Header = () => {
	const [dollarRate, setDollarRate] = useState<number | null>(null);
	const [euroRate, setEuroRate] = useState<number | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const getCurrencyRates = async () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const formattedDate = `${year}${month}${day}`;

		try {
			const [usdResponse, eurResponse] = await Promise.all([
				axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${formattedDate}&json`),
				axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=${formattedDate}&json`)
			]);
			setDollarRate(usdResponse.data[0]?.rate || null);
			setEuroRate(eurResponse.data[0]?.rate || null);
		} catch (error) {
			console.error("error: ", error);
			setIsError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCurrencyRates();
	}, []);

	return (
		<Box
			padding="16px"
			backgroundColor="teal.500"
			color="white"
			borderBottomRadius="md"
		>
		<Flex justifyContent="space-between" alignItems="center">
			{loading ? (
				<Spinner color="white" />
				) : isError ? (
				<Alert status="error">
					<AlertIcon />
					Error while getting exchange rates
				</Alert>
				) : (
				<>
					<Flex alignItems="center">
						<Text fontSize="lg">USD: {dollarRate}</Text>
					</Flex>
					<Flex alignItems="center">
						<Text fontSize="lg">EUR: {euroRate}</Text>
					</Flex>
				</>
			)}
		</Flex>
		</Box>
	);
};

export default Header;