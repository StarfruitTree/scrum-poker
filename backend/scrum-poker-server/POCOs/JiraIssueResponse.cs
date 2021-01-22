namespace scrum_poker_server.POCOs
{
    public class JiraIssueResponse
    {
        public RenderedFields RenderedFields { get; set; }

        public Fields Fields { get; set; }
    }

    public class RenderedFields
    {
        public string Description { get; set; }
    }

    public class Fields
    {
        public string Summary { get; set; }

        public float? Customfield_10026 { get; set; }
    }
}
