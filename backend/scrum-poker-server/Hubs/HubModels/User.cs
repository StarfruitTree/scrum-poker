using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.HubModels
{
  public class User
  {
    public string Name { get; set; }

    public string Status { get; set; }

    public int Point { get; set; }

    public User(string name, string status, int point = 0)
    {
      Name = name;
      Status = status;
      Point = point;
    }
  }
}