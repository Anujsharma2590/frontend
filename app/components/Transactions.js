import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import List from "./ui/List";
import { useTransactions } from "../api/TransactionContext";

export default function Transactions() {
  const layout = useWindowDimensions();
  const { transactions } = useTransactions();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(
    !transactions || !transactions.transactions
  ); 

  const [routes] = React.useState([
    { key: "first", title: "All" },
    { key: "second", title: "Day" },
    { key: "third", title: "Week" },
    { key: "fourth", title: "Month" },
    { key: "fifth", title: "Year" },
  ]);

  const filterTransactionsByTimeFrame = (transactions, timeFrame) => {
    const currentDate = new Date();
    let startTime;

    switch (timeFrame) {
      case "day":
        startTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        break;
      case "week":
        startTime = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        break;
      case "year":
        startTime = new Date(currentDate.getFullYear(), 0, 1);
        break;
      default:
        startTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
    }

    return transactions.filter(
      (transaction) => new Date(transaction.date) >= startTime
    );
  };

  const AllRoute = () => <List data={transactions?.transactions} />;
  const DayRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "day")}
    />
  );
  const WeekRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "week")}
    />
  );
  const MonthRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "month")}
    />
  );
  const YearRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "year")}
    />
  );

  const renderScene = SceneMap({
    first: AllRoute,
    second: DayRoute,
    third: WeekRoute,
    fourth: MonthRoute,
    fifth: YearRoute,
  });

  const tabBarStyle = {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ff4081" }}
      style={tabBarStyle}
      labelStyle={{ color: "#333" }}
    />
  );

  React.useEffect(() => {
    setLoading(!transactions || !transactions.transactions); 
  }, [transactions]);

  return (
    <>
      {loading ? ( 
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
