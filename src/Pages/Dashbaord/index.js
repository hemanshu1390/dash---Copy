import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Progress, Space, Statistic, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() 
{
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <>  
    <div>
    <div className="w-[60vmax] p-5" >
    <Tag className="ms-12" color="#87d068">Total Student</Tag>
    <Progress type="circle" percent={100} format={(percent) => `${100}'s`} />
    <Tag className="ms-12" color="#108ee9">Passed</Tag>
  <Progress type="circle"  percent={80} size="" />
  <Tag className="ms-12" color="#108ee9" >Fail</Tag>
  <Progress type="circle"  percent={20} size={80} />

    
    </div>
 <div>

      
    
   
 </div>
    </div>
    

    <Card className="w-[50vmax]" >
      <Bar className="w-[50vmax]" options={options} data={reveneuData} />
    </Card>
    </>

  );
}
export default Dashboard;
