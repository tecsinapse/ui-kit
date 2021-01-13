import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex, Input } from '@tecsinapse/ui-kit';
import { Wizard } from 'Wizard';
import { Step, Typography } from '@material-ui/core';

export default {
  title: `Packages @tecsinapse/wizard`,
  component: Wizard,
  decorators: [
    Story => {
      const style = { minWidth: '60vw' };

      return (
        <DivFlex>
          <div style={style}>
            <Story />
          </div>
        </DivFlex>
      );
    },
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `Step` component passed as children is reused from
            `@material-ui/core`. The `Wizard` component can receive the
            following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Wizard
      {...args}
      activeStep={activeStep}
      onChange={newStep => {
        if (activeStep === 2) {
          return 'Input validation failed';
        }
        setActiveStep(newStep);
        return;
      }}
    >
      <Step title="Contact Details">
        <DivFlex>
          <Input
            name="contact"
            id="contact"
            placeholder="Contact details"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Shipping Information">
        <DivFlex>
          <Input
            name="shipping"
            id="shipping"
            placeholder="Shipping information"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Billing Address" warningText="Please, fill correct address">
        <DivFlex>
          <Input
            name="billing"
            id="billing"
            placeholder="Billing address"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Review">
        <DivFlex>
          <Typography>All Set!</Typography>
        </DivFlex>
      </Step>
    </Wizard>
  );
};

Base.args = {
  variant: 'web',
};

export const WithWarning = args => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Wizard
      {...args}
      activeStep={activeStep}
      onChange={newStep => {
        if (activeStep === 3) {
          return;
        }
        setActiveStep(newStep);
      }}
      disableFinishButton
    >
      <Step
        title="Contact Details"
        warningText="Please, fill valid information"
      >
        <DivFlex>
          <Input
            name="contact"
            id="contact"
            placeholder="Contact details"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Shipping Information">
        <DivFlex>
          <Input
            name="shipping"
            id="shipping"
            placeholder="Shipping information"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Billing Address">
        <DivFlex>
          <Input
            name="billing"
            id="billing"
            placeholder="Billing address"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Review">
        <DivFlex>
          <Typography>All Set!</Typography>
        </DivFlex>
      </Step>
    </Wizard>
  );
};

WithWarning.args = {
  variant: 'auto',
};

export const Mobile = args => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Wizard
      {...args}
      activeStep={activeStep}
      onChange={newStep => {
        if (activeStep === 2) {
          return 'Input validation failed';
        }
        if (activeStep === 3) {
          return;
        }
        setActiveStep(newStep);
      }}
    >
      <Step title="Contact Details">
        <DivFlex>
          <Input
            name="contact"
            id="contact"
            placeholder="Contact details"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step
        title="Shipping Information"
        warningText="Please, fill correct address"
      >
        <DivFlex>
          <Input
            name="shipping"
            id="shipping"
            placeholder="Shipping information"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Billing Address">
        <DivFlex>
          <Input
            name="billing"
            id="billing"
            placeholder="Billing address"
            fullWidth
          />
        </DivFlex>
      </Step>
      <Step title="Review">
        <DivFlex>
          <Typography>All Set!</Typography>
        </DivFlex>
      </Step>
    </Wizard>
  );
};

Mobile.args = {
  variant: 'mobile',
};
