using api.Controllers.Helpers;
using api.data;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        public readonly ICommentRepository _commentRepo;
        public readonly IStockRepository _stockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository CommentRepository, IStockRepository stockRepository,
            UserManager<AppUser> userManager, IFMPService fmpService)
        {
            _commentRepo = CommentRepository;
            _stockRepo = stockRepository;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comments = await _commentRepo.GetAllAsync(queryObject);
            var commentDto = comments.Select(s => s.ToCommentDto());

            return Ok(commentDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost]
        [Route("{symbol:alpha}")]
        public async Task<IActionResult> Create([FromRoute] string symbol, [FromBody] CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stock = await _stockRepo.GetBySymbolAsync(symbol);
            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("Stock not found");
                }
                else
                {
                    await _stockRepo.CreateAsync(stock);
                }
            }

            var username = User.GetUsername();
            if (string.IsNullOrEmpty(username))
            {
                return NotFound("User not found");
            }

            var appUser = await _userManager.FindByNameAsync(username!);
            if (appUser == null)
            {
                return NotFound("AppUser not found");
            }

            var commentModel = commentDto.ToCommentFromCreate(stock.Id);
            commentModel.AppUserId = appUser?.Id;
            await _commentRepo.CreateAsync(commentModel);

            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (updateDto == null)
            {
                return BadRequest("Comment data is required.");
            }

            var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate(id));

            if (comment == null)
            {
                return NotFound("Comment not found.");
            }

            return Ok(comment.ToCommentDto());
        }


        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var commentModel = await _commentRepo.DeleteAsync(id);

            if (commentModel == null)
            {
                return NotFound("Comment does not exist.");
            }

            return Ok(commentModel);
        }
    }
}