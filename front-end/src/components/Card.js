import React from 'react';
import data from "./data"; 
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
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
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" component="h2">
        {data.sections[1].name}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.sections[1].rows[0].value}
        </Typography>
        <Typography variant="h4" component="h2">
        {data.sections[2].name}
        </Typography>
        <Typography variant="h5" component="h2">
        {data.sections[2].rows[0].value}
          <br />
          {'"Thank you for using Smart Recycling"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);