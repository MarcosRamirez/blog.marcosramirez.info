#!/usr/bin/env ruby
#
# Transform image_alt frontmatter to Chirpy image format

Jekyll::Hooks.register :posts, :pre_render do |post|
  if post.data['image_alt'] && post.data['image']
    post.data['image'] = {
      'src' => post.data['image'],
      'alt' => post.data['image_alt']
    }
  end
end