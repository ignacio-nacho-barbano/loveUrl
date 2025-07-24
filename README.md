# loveUrl

A URL builder and parser pack for handling URL states the easy way.

---

### 📦 Installation

Using npm:

```bash
npm install love-url
```

Using yarn:

```bash
yarn add love-url
```

Using pnpm:

```bash
pnpm add love-url
```

---

### ⚡ TL;DR — Quick Usage

```ts
type MyParams = {
  showDetails: boolean;
  page: number;
  tags: string[];
  status: "draft" | "published" | "archived";
};

// Encode to URL
// existing params PRESERVED
// currentPath PRESERVED
const url = loveUrl<MyParams>({
  showDetails: true,
  page: 2,
  tags: ["food", "travel"],
  status: "published",
});

// Encode to URL (existing params REMOVED)
const url = loveUrl<MyParams>(
  {
    showDetails: true,
    page: 2,
    tags: ["food", "travel"],
    status: "published",
  },
  {
    currentParams: null,
    url: "route-somewhere-else",
  }
);

// Pre-existing params ?name=bob&page=1
/*
  url = "/route-somewhere-else?name=bob&showDetails=true&page=2&tags=_._food_._travel&status=published"
*/

// Decode from URL
const parsed = parseLoveUrl<MyParams>(
  "?showDetails=true&page=2&tags=_._food_._travel&status=published"
  // or window.location.search
);

/*
  parsed = {
    showDetails: true,
    page: 2,
    tags: ["food", "travel"],
    status: "published"
  }
*/
```

---

### 🧠 Tip

- Arrays are encoded using a custom separator: `_._`  
  This ensures:
  - Consistent decoding even with a single item (`tags=_._design` → `["design"]`)
  - Reliable parsing when array items contain commas
- Booleans and numbers are parsed and typed automatically
- Invalid values (e.g., `status=broken`) will be parsed as `strings` unless custom validation is added

---

### 🚀 Motivation

**loveUrl** aims to simplify the common headaches when building and parsing URLs with parameters in modern JavaScript projects.

---

### 🔧 Key Use Cases

#### 1. **Building dynamic URLs that preserve client-side state**

Imagine your user is at `/currentPath/example` and the current URL params are:

`fileType=photo&selectedPeriod=weekly`

Instead of manually constructing links, you can just use:

```tsx
const ExampleComponent = () => (
  <div>
    {/* Renders: /currentPath/example?fileType=photo&selectedOption=option1&selectedPeriod=weekly */}
    <a href={loveUrl({ selectedOption: "option1" })}>Option 1</a>

    {/* Renders: /currentPath/example?fileType=photo&selectedOption=option2&selectedPeriod=weekly */}
    <a href={loveUrl({ selectedOption: "option2" })}>Option 2</a>

    {/* Renders: /currentPath/example?fileType=photo&selectedPeriod=weekly */}
    <a href={loveUrl({ selectedOption: undefined })}>Clear</a>
  </div>
);
```

---

#### 2. **Building and fetching dynamic URLs for APIs**

Building parameterized API URLs manually can get messy:

```ts
type DynamicDataOptions = {
  startDate?: string;
  endDate?: string;
  format?: "photos" | "videos";
  limit: number;
};

const fetchDynamicData = (params: DynamicDataOptions) => {
  let dataUrl = "https://api.my-project/files/archive";

  // Prevent undefined values from appearing in the query string
  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key];
    }
  }

  const queryString = new URLSearchParams(params).toString();
  if (queryString) dataUrl += `?${queryString}`;

  const req = await fetch(dataUrl);
  return await req.json();
};
```

Or even worse:

```ts
const fetchDynamicData = ({
  startDate,
  endDate,
  format,
  limit,
}: DynamicDataOptions) => {
  const req = await fetch(
    `https://api.my-project/files/archive?startDate=${startDate}&endDate=${endDate}&format=${format}&limit=${limit}`
  );

  return await req.json();
};
```

**Imagine doing this with 12+ parameters 😭**

---

#### ✅ With loveUrl:

```ts
const fetchDynamicData = (params: DynamicDataOptions) => {
  const req = await fetch(
    loveUrl(params, { url: "https://api.my-project/files/archive" })
  );

  return await req.json();
};
```

Clean. Type-safe. No string interpolation errors.

---

#### 3. **Parsing URL params without the chaos**

Handling conversions manually can quickly get out of hand:

```tsx
const ComponentThatUsesParams = () => {
  const params = new URLSearchParams(window.location.search);

  const myBoolean = params.get("myBoolean") === "true"; // string 'false' is truthy 😬
  const limit = parseInt(params.get("limit"));
  const percentage = parseFloat(params.get("percentage"));
  let favoriteFoods = params.get("favoriteFoods");

  if (favoriteFoods?.includes(",")) {
    favoriteFoods = favoriteFoods.split(",");
  }

  return (
    <div>
      <h1>My Params as an object:</h1>
      <code>
        {JSON.stringify({
          myBoolean,
          limit,
          percentage,
        })}
      </code>
    </div>
  );
};
```

---

#### ✅ With loveUrl:

```tsx
const ComponentThatUsesParams = () => {
  const { myBoolean, limit, percentage, favoriteFoods } = parseLoveUrl<{
    myBoolean: boolean;
    limit: number;
    percentage: number;
    favoriteFoods: string[];
  }>(window.location.search);

  return (
    <div>
      <h1>My Params as an object:</h1>
      <code>
        {JSON.stringify({
          myBoolean,
          limit,
          percentage,
        })}
      </code>
    </div>
  );
};
```

Type-safe, clean, and handles all conversions for you.

---

### ❤️ Why you'll love loveUrl

- Automatically ignores `undefined` values
- Handles complex param types like arrays, numbers, and booleans
- Uses a custom array separator (`_._`) for full consistency
- Prevents messy string interpolation
- Decodes and encodes with full TypeScript support
- Deals with duplicate params gracefully
- Keeps your URLs and logic clean and reliable
