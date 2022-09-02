import { Fragment, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { RESOURCES, EVENTS } from "./data";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function App() {
  const [mode, setMode] = useState<"default" | "tabs">("default");

  return (
    <Fragment>
    <div style={{ textAlign: "center" }}>
      <span>Resource View Mode: </span>
      <Button
        color={mode === "default" ? "primary" : "inherit"}
        variant={mode === "default" ? "contained" : "text"}
        size="small"
        onClick={() => setMode("default")}
      >
        Default
      </Button>
      <Button
        color={mode === "tabs" ? "primary" : "inherit"}
        variant={mode === "tabs" ? "contained" : "text"}
        size="small"
        onClick={() => setMode("tabs")}
      >
        Tabs
      </Button>
    </div>

    
    <Scheduler
      events={EVENTS}
      resources={RESOURCES}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 9,
        endHour: 18,
        step: 60
      }}
      resourceFields={{
        idField: "admin_id",
        textField: "title",
        subTextField: "mobile",
        avatarField: "title",
        colorField: "color"
      }}
      resourceViewMode={mode}
      selectedDate={new Date(2021, 4, 2)}
      fields={[
        {
          name: "admin_id",
          type: "select",
          default: RESOURCES[0].admin_id,
          options: RESOURCES.map((res) => {
            return {
              id: res.admin_id,
              text: `${res.title} (${res.mobile})`,
              value: res.admin_id //Should match "name" property
            };
          }),
          config: { label: "Assignee", required: true }
        }
      ]}
      viewerExtraComponent={(fields, event) => {
        return (
          <div>
            {fields.map((field, i) => {
              if (field.name === "admin_id") {
                // const admin =field.options.find(
                //   (fe) => fe.id === event.admin_id
                // );
                return (
                  <Typography
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <PersonRoundedIcon /> {"admin.text"}
                  </Typography>
                );
              } else {
                return "";
              }
            })}
          </div>
        );
      }}
    />
  </Fragment>
  );
}

export default App;
