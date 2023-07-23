#!/bin/bash

: '
@file Does the imposition of a A5 document onto A4 and compresses it.
      To run it, you need a shell, psutils, pdftk.
      You also need to call the script from the same directory
      than the source file
@author Yann Trividic
@license GPLv3
@see https://www.gitlab.com/yanntrividic/the-moral-of-the-xerox-vf
'

# Ideally, this would use cleaner tmp files and directory
pdf2ps $1 tmp.ps
psbook tmp.ps tmp_signature.ps
psnup -2 -s1.40 -p a4 tmp_signature.ps tmp.ps
pdf2ps tmp.ps booklet.pdf
rm tmp_signature.ps
rm tmp.ps
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -dNOPAUSE -dQUIET -dBATCH -sOutputFile=booklet_compressed.pdf booklet.pdf
mv booklet_compressed.pdf booklet.pdf
pdftk booklet.pdf cat 1-endeast output rotated_booklet.pdf
mv rotated_booklet.pdf booklet.pdf