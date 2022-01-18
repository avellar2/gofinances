import React from "react";
import { HightlightCard } from "../../components/HightlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
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
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string,
}

export function Dashboard() {
    
    const data:DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12,000.00",
            category: { name: "Vendas", icon: "dollar-sign" },
            date: "28/09/21",
        },
        {
            id: '2',
            type: 'negative',
            title: "Hamburgueria Pizzy",
            amount: "R$ 59,00",
            category: { name: "Alimentação", icon: "coffee" },
            date: "28/09/21",
        },
        {
            id: '3',
            type: 'negative',
            title: "Aluguel de apartamento",
            amount: "R$ 1,200.00",
            category: { name: "Casa", icon: "shopping-bag" },
            date: "28/09/21",
        },
        {
            id: '4',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12,000.00",
            category: { name: "Vendas", icon: "dollar-sign" },
            date: "28/09/21",
        },
    ];

    return (
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

                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightlightCards>
                <HightlightCard
                    type="up"
                    title={"Entrada"}
                    amount={"R$ 17.400,00"}
                    lastTransaction={"Última entrada dia 13 de Abril"}
                />
                <HightlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 3 de abril"
                />
                <HightlightCard
                    type="total"
                    title={"Total"}
                    amount={"R$ 16.141,00"}
                    lastTransaction="01 à 16 de abril"
                />
            </HightlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TransactionCard data={item} />
                    )}
                />
            </Transactions>
        </Container>
    );
}
