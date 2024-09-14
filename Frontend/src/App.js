import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import ProductListPage from "./Pages/ProductListPage";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ color: "white", fontSize: "20px" }}>
          Product Catalog
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
