using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.HubModels
{
    public class Story
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Point { get; set; }

        public User Assignee { get; set; }

        public Story(int id, string title, string content)
        {
            Id = id;
            Title = title;
            Content = content;
        }
    }
}
