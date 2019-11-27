import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card as CardType } from '../../generated/graphql';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }),
);

interface SimpleCardProps {
  card: CardType;
}

interface MyFormValues {
  number?: number | null;
  label?: string | null;
  description?: string | null;
}

export const SimpleCard: React.FC<SimpleCardProps> = (
  props: SimpleCardProps,
): React.ReactElement => {
  const { number, label, description, created } = props.card;
  const initialValues: MyFormValues = { number, label, description };
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(created).toDateString()}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions): void => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {(): React.ReactElement => (
            <Form>
              <div>
                <Field
                  name="number"
                  component={TextField}
                  id="number"
                  label="Card Number"
                  style={{ margin: 8 }}
                  placeholder="Placeholder"
                  margin="normal"
                  value={number}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
              <div>
                <Field
                  name="label"
                  component={TextField}
                  id="label"
                  label="Label"
                  style={{ margin: 8 }}
                  placeholder="Label"
                  margin="normal"
                  value={label}
                  disabled={false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
              <div>
                <Field
                  name="description"
                  component={TextField}
                  id="description"
                  label="Description"
                  style={{ margin: 8 }}
                  placeholder="Description"
                  margin="normal"
                  value={description}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardActions>
        <Button size="small">Update Card</Button>
      </CardActions>
    </Card>
  );
};
