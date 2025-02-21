const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const filter = {};
        
        if (args.genre) {
          
          // Wrap args.genre in an array to use with $in
          filter.genres = { $in: [args.genre] };
        }
        
        if (args.author) {
          // Assuming args.author is the identifier for the author
          // const author = await Author.findOne({ name: args.author})
          // console.log(author)
          filter.author = args.author;
        }
        
        // Use Mongoose to find the matching books.
        // Populate the author field so that the Book type's author property is a full Author object.
        return await Book.find(filter).populate('author');
      },
      allAuthors: async () => {
        const authors = await Author.find({});
        // console.log(authors)
        const books = await Book.find({}).populate('author');
        
        const authorsWithBookCount = authors.map(author => {
          // Filter the books array for those whose populated author name matches this author's name.
          const count = books.filter(book => book.author.name === author.name).length;
          
          // Return the author with an added property for bookCount.
          return {
            ...author.toObject(),// Convert the Mongoose document to a plain object.
            id: author._id.toString(),
            bookCount: count
          };
        });
      
        return authorsWithBookCount
  
        // return authors
        // const bookCounts = await Book.aggregate([
        //   {
        //     $group: {
        //       _id: "$author",         // Group books by the 'author' field.
        //       count: { $sum: 1 }       // Sum the number of books in each group.
        //     }
        //   }
        // ]);
  
        // // 3. Create a mapping from author id to their book count.
        // const countMap = bookCounts.reduce((acc, curr) => {
        //   acc[curr._id.toString()] = curr.count;
        //   return acc;
        // }, {});
  
        // // 4. Return each author, merging in the computed bookCount.
        // return authors.map(author => ({
        //   ...author.toObject(),  // Convert the Mongoose document to a plain JavaScript object.
        //   bookCount: countMap[author._id.toString()] || 0  // Default to 0 if no books found.
        // }));
  
  
  
        // return authors.map( author => ({
        //   ...author,
        //   bookCount: books.filter(book => book.author === author.name).length,
        // }));
      },
      me: async (root, args, context) => {
        if(!context.currentUser){
          throw new GraphQLError('Not authorized', {
            extensions: {
              code: 'UNAUTHENTICATED',
            }
          })
        }
        return context.currentUser;
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if(!context.currentUser){
          throw new GraphQLError('Not authorized', {
            extensions: {
              code: 'UNAUTHENTICATED',
            }
          })
        }
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          try {
            await author.save();
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        }
        const book = new Book({ ...args, author: author._id });
        
        try {
          await book.save();

        } catch (error) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
          //console.log(book)
          pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author')})

          return book.populate('author')
        // if(!authors.some(author => author.name === args.author)){
        //   authors = authors.concat({ name: args.author, id: uuid()})
        // }
        // const book = {title: args.title, author: args.author, published: args.published, genres: args.genres, id: uuid()}
        // books = books.concat(book)
        // return book
      },
      editAuthor: async (root, args, context) => {
        if(!context.currentUser){
          throw new GraphQLError('Not authorized', {
            extensions: {
              code: 'UNAUTHENTICATED',
            }
          })
        }
        const author = await Author.findOne({ name: args.name });
  
        author.born = args.setBornTo;
  
        try { 
          await author.save();
        } catch (error) {
          throw new GraphQLError('Author update failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        return author
        // const author = authors.find(author => author.name === args.name)
  
        // if(!author) return null
        // author.born = args.setBornTo
        
        // return author
      },
      createUser: async (root, args) => {
        const user = new User({ ...args });
  
        try {
          await user.save();
        } catch (error) {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        return user;
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
        
        if(!user || args.password !== 'secret'){
          throw new GraphQLError('Invalid credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
  }

  module.exports = resolvers