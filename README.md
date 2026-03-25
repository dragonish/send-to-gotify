# send-to-gotify

A GitHub Action.

## Feature

Send a message to [Gotify](https://gotify.net).

## Example workflow

```yaml
name: Send Message
on: [push]

jobs:
  send-message:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v6
      - name: Send notification
        uses: dragonish/send-to-gotify@v1
        with:
          url: ${{ secrets.GOTIFY_URL }}
          token: ${{ secrets.GOTIFY_TOKEN }}
          message: "${{ github.repository }}\n\n#${{ job.status }}"
```

## Inputs

<!-- markdownlint-configure-file {"no-inline-html": {"table_allowed_elements": ["br"]}} -->

| ID | Type | Default | Description |
| -- | :--: | ------- | ----------- |
| `url` | string | **required** | Gotify service address (e.g., `https://gotify.net`). |
| `token` | string | **required** | Gotify application token. |
| `message` | string | **required** | The message. Markdown (excluding html) is allowed. |
| `title` | string | `""` | The title of the message. |
| `priority` | integer | | The priority of the message. If unset, then the default priority of the application will be used. |
| `content-type` | string | `"text/plain"` | Changes how client displays information.<br>`"text/plain"`: The message will be rendered as plain text. Links may be highlighted and be clickable.<br>`text/markdown`: The message should be rendered as markdown. HTML should be ignored. |
| `click-url` | string | `""` | Opens an URL on notification click. |
| `big-image-url` | string | `""` | Shows a big image in the notification. |
| `intent-url` | string | `""` | Opens an intent after the notification was delivered. |
| `extras` | string | `""` | The extra data sent along the message.<br>The extra fields are stored in a key-value scheme. The keys should be in the following format: `<top-namespace>::[<sub-namespace>::]<action>`.<br>Example: `'{"home::lighting": {"onLighting": {"brightness": 15}}}'` |

## Outputs

| ID | Example | Description |
| -- | ------- | ----------- |
| `success` | `"true"` or `"false"` | Informs whether sending was successful. |
| `id` | `"1234"` | The message id. |
| `appid` | `"5"` | The application id that send this message. |
| `date` | `"2020-08-31T21:40:32.532519837+01:00"` | The date the message was created. |

## License

[MIT](./LICENSE) license
