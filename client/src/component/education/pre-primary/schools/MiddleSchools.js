import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Error from "../../../features/Error";
import Loader from "../../../features/Loader";
import { Typography } from "@mui/material";
import { schoolPrePrimaryMid } from "../../../../redux/actions/educationsAction/education";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";

import ChartLineDependency from "../../../chart/edu/schools/ChartLineDependency";
import ChartLineResidence from "../../../chart/edu/schools/ChartLineResidence";

import ChartBarResidence from "../../../chart/edu/schools/ChartBarResidence";
import ChartBarDependency from "../../../chart/edu/schools/ChartBarDependency";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const MiddleStudents = ({ city }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(schoolPrePrimaryMid(city));
  }, [city]);
  const listScoolMidReducer = useSelector((state) => state.listScoolMidReducer);
  const { schools, error, loading } = listScoolMidReducer;
  const data = schools.sort((a, b) => a._id.year - b._id.year);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : schools ? (
        <>
          <Typography variant="p">
            The total number of schools in pre-primary education in {city}
            2017,2018,2019,2020,2021,2022 with division urban and rural,
            governmental and private , boys and girls
          </Typography>
          <hr style={{ width: "240px" }} />
          <Table
            striped
            bordered
            hover
            style={{
              marginBottom: "30px",
            }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Year</th>

                <th>Dependncy</th>
                <th>Residence</th>

                <th>Total Schools</th>
              </tr>
            </thead>
            <tbody>
              {data.map((pop, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{pop?._id.year}</td>

                  <td>{pop?._id.dependency}</td>
                  <td>{pop?._id.residence}</td>
                  <td>{pop?.total_schools}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Typography variant="h4" style={{ marginTop: "20px" }}>
            Graphs
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Line" {...a11yProps(0)} />
                <Tab label="Bar" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Row>
                <Col>
                  <Card>
                    <ChartLineResidence data1={data} />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <ChartLineDependency data1={data} />
                  </Card>
                </Col>
              </Row>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Card>
                    <ChartBarResidence data1={data} />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <ChartBarDependency data1={data} />
                  </Card>
                </Col>
              </Row>
            </TabPanel>
          </Box>
        </>
      ) : null}
    </div>
  );
};

export default MiddleStudents;
