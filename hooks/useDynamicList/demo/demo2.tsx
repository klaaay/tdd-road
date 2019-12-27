import React, { useState } from "react";
import { Form, Input, Button, List, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import useDynamicList from "..";

interface CardProps extends FormComponentProps {
  index: number;
  list: any[];
  name: string;
}

const Card = (props: CardProps) => {
  console.log(props.list);
  const { list, getKey, push, remove } = useDynamicList(props.list || [1]);

  return (
    <div style={{ border: "1px solid #e8e8e8", padding: 16, marginBottom: 16 }}>
      <Form.Item label="Group Name">
        {props.form.getFieldDecorator(`params[${props.index}].groupName`, {
          initialValue: props.name,
        })(<Input placeholder="Please enter group name" />)}
      </Form.Item>

      <Form.Item label="frequency">
        {list.map((ele, index) => {
          console.log(index);
          return (
            <div style={{ marginBottom: 16 }} key={getKey(index)}>
              {props.form.getFieldDecorator(
                `params[${props.index}].ad[${getKey(index)}].name`,
                {
                  initialValue: ele.name,
                },
              )(
                <Input
                  placeholder="Please enter the advertisement name"
                  addonBefore="name："
                />,
              )}
              {props.form.getFieldDecorator(
                `params[${props.index}].ad[${getKey(index)}].frequency`,
                {
                  initialValue: ele.value,
                },
              )(
                <Input
                  placeholder="Please entery the frequency"
                  addonAfter="times/day"
                />,
              )}
              {list.length > 1 && (
                <Icon
                  type="minus-circle-o"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    remove(index);
                  }}
                />
              )}
              {list.length - 1 === index && (
                <Icon
                  type="plus-circle-o"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    push("");
                  }}
                />
              )}
            </div>
          );
        })}
      </Form.Item>
    </div>
  );
};

interface ListItem {
  name: string;
  list: Array<{ name: string | undefined; value: number | undefined }>;
}

export default Form.create()((props: FormComponentProps) => {
  const [result, setResult] = useState("");

  const { list, push, getKey, sortForm, remove } = useDynamicList<ListItem>([
    {
      name: "Group 1",
      list: [
        { name: "ad1", value: 2 },
        { name: "ad2", value: 1 },
      ],
    },
  ]);

  return (
    <div style={{ width: 800, margin: "auto", display: "flex" }}>
      <div style={{ width: 400, marginRight: 16 }}>
        {list.map((ele: ListItem, index: number) => (
          <React.Fragment>
            <Card
              form={props.form}
              key={getKey(index)}
              list={ele.list}
              name={ele.name}
              index={getKey(index)}
            />
            {list.length > 1 && (
              <Icon
                type="minus-circle-o"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  remove(index);
                }}
              />
            )}
            {list.length - 1 === index && (
              <Icon
                type="plus-circle-o"
                style={{ marginLeft: 8 }}
                onClick={() =>
                  push({
                    name: "",
                    list: [
                      {
                        name: undefined,
                        value: undefined,
                      },
                    ],
                  })
                }
              />
            )}
          </React.Fragment>
        ))}
        {/* <Button
          style={{ marginTop: 16 }}
          block
          onClick={() => push({} as ListItem)}>
          Add Group
        </Button> */}
      </div>
      <div>
        <Button
          onClick={() => {
            const res = props.form.getFieldsValue().params;
            const sortedResult = sortForm(res);
            setResult(JSON.stringify(sortedResult, null, 2));
          }}>
          Retrieve form data
        </Button>
        <div>
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
});
