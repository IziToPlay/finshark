using api.Dtos.Comment;

namespace api.Dtos.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public decimal Purchase { get; set; }
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
        //Comments are excluded from the DTO for simplicity and to avoid circular references in serialization
        public List<CommentDto>? Comments { get; set; }
    }
}