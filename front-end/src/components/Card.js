import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const styles = theme => ({
//   card: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
//   typography: {
//     h4: {
//       fontSize: 33,
//       fontFamily: "Montserrat",
//       fontWeight: 300,
//       color: "orange",
//       letterSpacing: "0.0075em",
//       verticalAlign: "middle",
//       alignItems: "center",
//       textAlign: "left"
//     }
//   }
// });

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const STYLE = {
  title: {},
  location: {
  },
  locationSubtitle: {
    color: "gray"
  }
};

class SimpleCard extends React.Component {
  state = {

  };

  renderSection = (section, index) => {
    if (index === 0) return null;
    switch (section.field) {
      case "Depots":
        return (
          <>
            <Typography variant="h4" component="h2">
              {section.field}
            </Typography >
              {
              section.title
              ?
              <Typography variant="h5" component="h2">
                {section.title}
              </Typography>
              :
              null}
            {section.rows ? section.rows.map((row, index2) => this.renderRow(row, section.value, index2)) : null}
          </>
        );
      default:
        return (
          <>
            <Typography variant="h4" component="h2">
              {section.value}
            </Typography>
            {section.rows ? section.rows.map((row, index2) => this.renderRow(row, section.value, index2)) : null}
          </>
        );
    }
  }

  renderRow = (row, index, index2) => {
    switch (row.type) {
      case "html":
        return (
          <Typography variant="h5" component="h2">
            <div dangerouslySetInnerHTML={{ __html: row.html }} />
            {/* {row.html} */}
          </Typography>
        )
      case "page":
        return (
          <>
            <Typography style={STYLE.location} variant="h6" component="h2">
              {row.label}
            </Typography>
            <Typography style={STYLE.locationSubtitle} variant="subtitle2" component="h2">
              {row.result_address}
            </Typography>
          </>
        )
      default:
        return (
          <Typography variant="h5" component="h2" key={"" + index + "" + index2}>
            {row.value}
          </Typography>
        )
    }
  }

  properTitle = title => {
    let newTitle = title.split('_').join(' ');
    return toTitleCase(newTitle);
  }

  render() {
    const { classes, data } = this.props;
    console.log(data);
    return (
      <Card>
        <CardContent>
        <Typography variant="subtitle2" component="h2">
            {`We identified your picture as: ${data.searchString}. \n Best guess for recyclable materials:`}
          </Typography>
          <Typography variant="h4" component="h2">
            {this.properTitle(data.page_name)}
          </Typography>
          {data.sections ? data.sections.map((s, i) => this.renderSection(s, i)) : null}
          <Typography variant="h5" component="h2">
            {'"Thank you for using Smart Recycling"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}

// SimpleCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default SimpleCard;
// export default withStyles(styles)(SimpleCard);