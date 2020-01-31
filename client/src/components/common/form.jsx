import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import user from "../../services/userService";
import Input from "./input";

export default class Form extends Component {
  state = {
    form: {},
    data: {},
    settings: {},
    errors: {}
  };

  validadeProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validade = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validade();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  onChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validadeProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  onCheck = async ({ currentTarget: input }) => {
    const { settings } = this.state;
    settings[input.name] = input.checked;
    this.setState({ settings });

    try {
      await user.setSettings(this.state.settings);
    } catch (ex) {
      toast.error(
        "Sorry something went wrong and your settings were not updated"
      );
    }
  };

  renderFormHeader = ({ src, alt, header, body }) => {
    return (
      <div className="text-center mt-2">
        <div className="logoForm">
          <img width="100%" src={src} alt={alt} />
        </div>
        <h1 className="font-weight-normal">{header}</h1>
        <p>{body}</p>
      </div>
    );
  };

  renderInput(name, placeholder, type) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={data[name]}
        onChange={this.onChange}
        error={errors[name]}
      />
    );
  }

  renderInputCheckBox(name, label) {
    return (
      <div className="row  mr-auto">
        <div className="col-8">
          <h3>{label}</h3>
        </div>
        <div className="col-4">
          <label className="switch">
            <input
              type="checkbox"
              name={name}
              id={name}
              onChange={this.onCheck}
              checked={this.state.settings[name]}
            />
            <div className="switch-btn"></div>
          </label>
        </div>
      </div>
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validade()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderFormFooter(msg, link, label) {
    return (
      <p className="mt-2 text-muted">
        {msg} <a href={link}>{label}</a>
      </p>

      // <Link to={link}>{label}</Link>
    );
  }
}
