# Foodie — GitHub Pages + Firebase Realtime Database

Foodie is a mobile-first food delivery website with a customer flow and a rider console. It uses static HTML/CSS/JavaScript, so this folder can be hosted directly from GitHub Pages.

## Connect Firebase

1. Create a Firebase project on the free Spark plan.
2. Register a Web app in **Project settings → Your apps**.
3. Create **Realtime Database**. Foodie does not use Firebase Storage.
4. Copy the web app config into `firebase-config.js`.
5. Paste `database.rules.json` into the Realtime Database Rules tab and publish it.
6. Upload the contents of this folder to the root of a GitHub Pages repository.

The app uses only these database paths:

```text
/orders/{orderId}
/riderLocations/{orderId}
/riderPresence/{orderId}
```

The customer listens to `/riderLocations/{orderId}` in realtime. The rider console uses the browser Geolocation API and writes the latest latitude/longitude to that node. GitHub Pages must be served over HTTPS for location permission to work.

## Test without Firebase

Leave the placeholder config as-is. Foodie stores orders in the browser and the **Preview live ride** button animates a rider on the map.

## Important security note

The included rules are convenient for this no-login prototype: order and rider nodes are readable and writable by the public client. That is not suitable for real payments or private customer data. Before commercial use, add Firebase Authentication and rules that limit each customer or rider to their own order. Never put a Firebase service-account key in this folder.
