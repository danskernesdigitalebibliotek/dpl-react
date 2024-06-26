# Campaigns

Campaigns are elements that are shown on the search result page above the search
result list. There are three types of campaigns:

1. Full campaigns - containing an image and a some text.
2. Text-only campaigns - they don't show any images.
3. Image-only campaigns - they don't show any text.

However, they are only shown in case certain criteria are met. We check for this
by contacting the dpl-cms API.

## How campaign setup works in dpl-cms

Dpl-cms is a cms system based on Drupal, where the system administrators can set
up campaigns they want to show to their users. Drupal also allows the cms system
to act as an API endpoint that we then can contact from our apps.

The cms administrators can specify the content (image, text) and the visibility
criteria for each campaign they create. The visibility criteria is based on
search filter facets.
Does that sound familiar? Yes, we use another API to get that very data
in THIS project - in the search result app.
The facets differ based on the search string the user uses for their search.

As an example, the dpl-cms admin could wish to show a Harry Potter related
campaign to all the users whose search string retreives search facets which
have "Harry Potter" as one of the most relevant subjects.
Campaigns in dpl-cms can use triggers such as subject, main language, etc.

## React code example

An example code snippet for retreiving a campaign from our react apps would then
look something like this:

```javascript
  // Creating a state to store the campaign data in.
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );

  // Retreiving facets for the campaign based on the search query and existing
  // filters.
  const { facets: campaignFacets } = useGetFacets(q, filters);

  // Using the campaign hook generated by Orval from src/core/dpl-cms/dpl-cms.ts
  // in order to get the mutate function that lets us retreive campaigns.
  const { mutate } = useCampaignMatchPOST();

  // Only fire the campaign data call if campaign facets or the mutate function
  // change their value.
  useDeepCompareEffect(() => {
    if (campaignFacets) {
      mutate(
        {
          data: campaignFacets as CampaignMatchPOSTBodyItem[],
           params: {
            _format: "json"
          }
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          },
          onError: () => {
            // Handle error.
          }
        }
      );
    }
  }, [campaignFacets, mutate]);

```

## Showing campaigns in dpl-react when in development mode

You first need to make sure to have a campaign set up in your locally running
dpl-cms (
[run this repo locally](https://github.com/danskernesdigitalebibliotek/dpl-cms))
Then, in order to see campaigns locally in dpl-react in development mode, you
will most likely need a browser plugin such as Google Chrome's
["Allow CORS: Access-Control-Allow-Origin"](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)
in order to bypass CORS policy for API data calls.
