import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HightlightCard } from "../../components/HightlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    TransactionCard,
    TransactionCardProps,
} from "../../components/TransactionCard";
import {
    Container,
    Header,
    HightlightCards,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HightlightProps {
    amount: string;
}

interface HightlightData {
    entries: HightlightProps;
    expensives: HightlightProps;
    total: HightlightProps;
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [hightlightData, setHightlightData] = useState<HightlightData>(
        {} as HightlightData
    );

    async function loadTransactions() {
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensivesTotal = 0;

        const transactionFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {
                if (item.type === "positive") {
                    entriesTotal += Number(item.amount);
                } else {
                    expensivesTotal += Number(item.amount);
                }

                const amount = Number(item.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });

                const date = Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                };
            }
        );

        setTransactions(transactionFormatted);

        const total = entriesTotal - expensivesTotal;

        setHightlightData({
            entries: {
                amount: entriesTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
            expensives: {
                amount: expensivesTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
            total: {
                amount: total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
        });
        console.log(transactionFormatted);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <>
            <Container>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo
                                source={{
                                    uri: "https://avatars.githubusercontent.com/u/54341411?v=4",
                                }}
                            />
                            <User>
                                <UserGreeting>Olá</UserGreeting>
                                <UserName>Vandinho</UserName>
                            </User>
                        </UserInfo>

                        <GestureHandlerRootView>
                            <LogoutButton onPress={() => {}}>
                                <Icon name="power" />
                            </LogoutButton>
                        </GestureHandlerRootView>
                    </UserWrapper>
                </Header>

                <HightlightCards>
                    <HightlightCard
                        type="up"
                        title={"Entrada"}
                        amount={hightlightData?.entries?.amount}
                        lastTransaction={"Última entrada dia 13 de Abril"}
                    />
                    <HightlightCard
                        type="down"
                        title="Saídas"
                        amount={hightlightData?.expensives?.amount}
                        lastTransaction="Última saída dia 3 de abril"
                    />
                    <HightlightCard
                        type="total"
                        title={"Total"}
                        amount={hightlightData?.total?.amount}
                        lastTransaction="01 à 16 de abril"
                    />
                </HightlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TransactionCard data={item} />
                        )}
                    />
                </Transactions>
            </Container>
        </>
    );
}
