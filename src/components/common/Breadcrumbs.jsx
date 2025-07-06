import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

// prop structure:
// [ { pathname:'',url:'' }, {pathname:'',url:'' } ]
const Breadcrumbs = ({ linkDataProp }) => {
 const lng = 'fa';
 return (
  <MuiBreadcrumbs
   aria-label='breadcrumb'
   separator='/'
   sx={{
    marginBottom: '1rem',
    width: '100%',
    direction: 'rtl',
    '& .MuiBreadcrumbs-separator': {
     fontSize: '10px', 
    },
   }}>
   {linkDataProp.map((el, index) => {
    if (index === linkDataProp.length - 1) return;
    return (
     <Link
      underline='hover'
      color='inherit'
      href={`/${el.url}`}
      sx={{
       fontSize: '0.5rem !important',
       textDecoration: 'underline !important',
      }}
      key={index}>
      {el.pathname}
     </Link>
    );
   })}
   (
   <Typography
    color='black'
    href={`/${linkDataProp[linkDataProp.length - 1].url}`}
    sx={{ fontSize: '0.5rem' }}>
    {linkDataProp[linkDataProp.length - 1].pathname}
   </Typography>
   )
  </MuiBreadcrumbs>
 );
};

export default Breadcrumbs;
