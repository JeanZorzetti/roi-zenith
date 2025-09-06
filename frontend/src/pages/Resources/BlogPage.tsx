import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { Search, Clock, User, Calendar } from 'lucide-react';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI', 'Sales', 'Technology', 'Case Study', 'Best Practices'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Sales': 'bg-green-600/20 text-green-400 border-green-600/30',
      'Technology': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      'Case Study': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
      'Best Practices': 'bg-primary-600/20 text-primary-400 border-primary-600/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  };

  const PostCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <article 
      className={`${
        featured 
          ? 'bg-gradient-to-br from-primary-900/20 to-secondary-900/10 border-primary-500/30' 
          : 'bg-gray-900/50'
      } backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group`}
      onClick={() => navigate(`/resources/blog/${post.id}`)}
    >
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className={featured ? 'p-8' : 'p-6'}>
        <div className="flex items-center gap-3 mb-4">
          <Badge className={`${getCategoryColor(post.category)} font-light`}>
            {post.category}
          </Badge>
          {featured && (
            <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 font-light">
              Featured
            </Badge>
          )}
        </div>

        <h2 className={`${featured ? 'text-2xl' : 'text-xl'} font-light text-pure-white mb-4 line-clamp-2 group-hover:text-primary-300 transition-colors`}>
          {post.title}
        </h2>
        
        <p className="text-gray-400 font-light leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen pt-20 bg-pure-black">
      <AnimatedSection className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light mb-6 bg-gradient-to-r from-pure-white via-primary-400 to-secondary-400 bg-clip-text text-transparent tracking-wide">
            Blog ROI Labs
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Insights, tendências e melhores práticas sobre IA em vendas B2B. 
            Aprenda com especialistas e transforme seus resultados.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar artigos, temas ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-900/50 border-gray-700/50 text-pure-white placeholder:text-gray-500 rounded-xl py-4 font-light focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-pure-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {searchTerm === '' && selectedCategory === 'All' && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-light text-pure-white mb-8">Artigos em Destaque</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <PostCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-light text-pure-white">
              {searchTerm || selectedCategory !== 'All' ? 'Resultados' : 'Todos os Artigos'}
            </h2>
            <span className="text-gray-400 font-light">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-light">
                Nenhum artigo encontrado para "{searchTerm}" em {selectedCategory}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-primary-400 hover:text-primary-300 mt-4 font-light"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm === '' && selectedCategory === 'All' ? regularPosts : filteredPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </AnimatedSection>
    </div>
  );
};

export default BlogPage;