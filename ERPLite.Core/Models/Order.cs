namespace ERPLite.Core.Models
{

  public class Order
  {
    public string Id {get; set;} = Guid.NewGuid().ToString();
    public int Quantity {get; set;}
    public string Status {get; set;} = "New";
  }
}
