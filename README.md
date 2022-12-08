# Avax Rent-a-Car (powered by Momentum)

[https://avax.netlify.com/](https://avax.netlify.com/)
[Staging](https://staging--avax.netlify.com)
[Testing](https://testing--avax.netlify.com)

## Importing icons

* Add **SVG** icons to `src/components/Icons` folder
* Run `npm run build-icons` which will optimize SVG with SVGO and convert it to React component with SVGR
* Import and use icon as component from `Icons` folder:

  ```javascript
  import ZoomIcon from '../Icons/Zoom';

  const NewComponent = () => <div>
    <ZoomIcon className={s.icon} fill="#e5e5e5" />
  </div>;
  ```
* _Recommended_: delete SVG files after, in order not to transform every time the script runs.
