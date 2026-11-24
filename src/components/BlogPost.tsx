import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Box,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

/** Renders post Markdown with MUI elements. Tables scroll inside their own box. */
export default function BlogPostBody({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 2, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 1.5, fontWeight: 600 }}>
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography component="p" sx={{ mb: 2, lineHeight: 1.75, fontSize: '1.05rem', overflowWrap: 'anywhere' }}>
            {children}
          </Typography>
        ),
        a: ({ href, children }) => (
          <MuiLink href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            {children}
          </MuiLink>
        ),
        ul: ({ children }) => (
          <Box component="ul" sx={{ pl: 3, mb: 2, '& li': { mb: 0.75, lineHeight: 1.7, fontSize: '1.05rem' } }}>
            {children}
          </Box>
        ),
        ol: ({ children }) => (
          <Box component="ol" sx={{ pl: 3, mb: 2, '& li': { mb: 0.75, lineHeight: 1.7, fontSize: '1.05rem' } }}>
            {children}
          </Box>
        ),
        code: ({ children }) => (
          <Box
            component="code"
            sx={{ px: 0.6, py: 0.15, borderRadius: 0.75, bgcolor: 'action.selected', fontFamily: 'monospace', fontSize: '0.9em' }}
          >
            {children}
          </Box>
        ),
        img: ({ src, alt }) => (
          // Mermaid output is a fixed light diagram, so it sits on a white panel in both themes.
          <Box
            component="span"
            sx={{
              display: 'block',
              my: 3,
              bgcolor: '#ffffff',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 1.5,
              overflowX: 'auto',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={typeof src === 'string' ? src : undefined}
              alt={alt ?? ''}
              style={{ display: 'block', width: '100%', minWidth: 420, height: 'auto' }}
            />
          </Box>
        ),
        table: ({ children }) => (
          <TableContainer sx={{ my: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 480 }}>
              {children}
            </Table>
          </TableContainer>
        ),
        thead: ({ children }) => <TableHead>{children}</TableHead>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        tr: ({ children }) => <TableRow>{children}</TableRow>,
        th: ({ children, style }) => (
          <TableCell align={(style?.textAlign as 'left' | 'right' | 'center') ?? 'left'} sx={{ fontWeight: 700 }}>
            {children}
          </TableCell>
        ),
        td: ({ children, style }) => (
          <TableCell align={(style?.textAlign as 'left' | 'right' | 'center') ?? 'left'}>{children}</TableCell>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
