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

| input_id | type | default | description | required |
| -------- | :--: | ------- | ----------- | :------: |
| `url` | string | | Gotify service address (e.g., `https://gotify.net`). | true |
| `token` | string | | Gotify application token. | true |
| `message` | string | | The message. Markdown (excluding html) is allowed. | true |
| `title` | string | `""` | The title of the message. | false |
| `priority` | integer | | The priority of the message. If unset, then the default priority of the application will be used. | false |
| `content-type` | string | `"text/plain"` | Changes how client displays information.<br>`"text/plain"`: The message will be rendered as plain text. Links may be highlighted and be clickable.<br>`text/markdown`: The message should be rendered as markdown. HTML should be ignored. | false |
| `click-url` | string | `""` | Opens an URL on notification click. | false |
| `big-image-url` | string | `""` | Shows a big image in the notification. | false |
| `intent-url` | string | `""` | Opens an intent after the notification was delivered. | false |
| `extras` | string | `""` | The extra data sent along the message.<br>The extra fields are stored in a key-value scheme. The keys should be in the following format: `<top-namespace>::[<sub-namespace>::]<action>`.<br>Example: `'{"home::lighting": {"onLighting": {"brightness": 15}}}'` | false |

## Outputs

| output_id | type | description |
| --------- | :--: | ----------- |
| `success` | string | Informs whether sending was successful. Values: `"true"` or `"false"`. |
| `id` | string | The message id. |
| `appid` | string | The application id that send this message. |
| `date` | string | The date the message was created. |

## License

[MIT](./LICENSE) license
